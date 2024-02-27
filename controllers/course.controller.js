const Course = require("../models/courses");
const Student = require("../models/student");
const jwt = require("jsonwebtoken");

const { response, request } = require("express");

const courseGet = async (req, res) => {
  const { limite, desde } = req.query;
  const token = req.header("x-token");

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const query = { estado: true, teacherId: uid };
    const [total, courses] = await Promise.all([
      Course.countDocuments(query),
      Course.find(query).skip(Number(desde)).limit(Number(limite)),
    ]);

    res.status(200).json({
      total,
      courses,
      msg: "Id of the logged in teacher",
      uid,
    });
  } catch (e) {
    res.status(400).json({
      msgg: "Error showing courses",
    });
  }
};

const courseGetByStudent = async (req, res) => {
  const { limite, desde } = req.query;

  try {
    const query = { estado: true };

    const [total, courses] = await Promise.all([
      Course.countDocuments(query),
      Course.find(query).skip(Number(desde)).limit(Number(limite)),
    ]);

    res.status(200).json({
      total,
      courses,
    });
  } catch (e) {
    res.status(400).json({
      msg: "Error displaying courses",
    });
  }
};

const coursesPut = async (req, res) => {
  const { id } = req.params;
  const { _id, teacherId, ...resto } = req.body;

  try {
    const previousCourse = await Course.findById(id);
    const courseUpdate = await Course.findByIdAndUpdate(id, resto, {
      new: true,
    });
    await updateCoursesInStudent(
      previousCourse.coursesName,
      courseUpdate.coursesName
    );
    res.status(202).json({
      msg: "This course was updated",
      courseUpdate,
    });
  } catch (e) {
    console.error("Error updating the course", e);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const courseDelete = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findByIdAndUpdate(id, { estado: false });
  const courseAuthenticated = req.teacher;
  res.status(200).json({
    msg: "this course was removed",
    course,
    courseAuthenticated,
  });
};

const coursePost = async (req, res) => {
  const token = req.header("x-token");

  const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
  const { coursesName, description } = req.body;
  const course = new Course({ coursesName, description, teacherId: uid });

  await course.save();
  res.status(202).json({
    uid,
    course,
  });
};

 const updateCoursesInStudent = async (previousCourseName, newCourseName) => {
    try {
        console.log('Calling the function to update courses');
        
        const studentsWithPreviousCourse = await Student.find({ courses: previousCourseName });

        await Promise.all(studentsWithPreviousCourse.map(async (student) => {
            // En lugar de buscar por el ID del curso, ahora buscamos por el nombre del curso
            const filter = { _id: student._id, courses: previousCourseName };
            const update = { $set: { "courses.$": newCourseName } };

            await Student.findOneAndUpdate(filter, update);
        }));

        console.log('Courses updated successfully');
    } catch (error) {
        console.error('Error updating courses for students:', error);
        throw error;
    }
} 

module.exports = {
  courseGet,
  courseGetByStudent,
  coursesPut,
  courseDelete,
  coursePost,
};
