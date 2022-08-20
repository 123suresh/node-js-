const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log(" connected to mongoDB ... "))
    .catch(err => console.error('Couldnot connect to mongoDB ... ', err))


//Schema
const courseSchema = new mongoose.Schema({
    name: {type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
        // match:/regex/
    },
    category:{
        type: String,
        required:true,
        enum:['web','mobile','network'],
        lowercase: true,
        trim: true //remove paddings
    },
    auther: String,
    //custom validator
    tags: {
        type: Array,
        validate:{
            validator: function(v){
                return v && v.length>0;
            },
        message: "A course should have tag"
        }
    },

    //async validator
    // tags:{
    //     type: Array,
    //     validate:{
    //         isAsync:true,
    //         validator: function(v, callback){
    //             setTimeout(() => {
    //                 const result = v && v.length>0;
    //                 callback(result)
    //             },3000)
    //         },
    //         message: "A course should have tag"
    //     }
    // },
    date: { type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function(){ return this.isPublished},
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

//compiling Schema to model
const Course = mongoose.model('Course', courseSchema); 


async function createCourse() {
    const course = new Course({
        name: 'Marketing Course 2',
        category:'Web',
        auther: 'suresh',
        tags: ['angular', 'frontend'],
        isPublished: false,
        price:15
    });

    try{
        const result = await course.save();
        console.log('....', result);
    }
    catch(ex){
        // console.log(ex.message);
        for(field in ex.errors)
        console.log(ex.errors[field])
    }
    
}

createCourse();

async function getCourses() {
//comparision operators
//eq (equal)
//ne (not equal)
//gt (greater than)
//gte (greater than or equal to)
//lt (less than)
//in
//nin (not in)

//logical operator
//or
//and

    const courses = await Course
    //comparision
    // .find({price: {$gte: 10, $lte: 20}})
    // .find({price: {$in:[10, 15, 20]}})
    //logical
    .find()
    .or([ {auther: 'suresh'}, {isPublished: true} ])
    .and([ {auther: 'suresh'}, {isPublished: true} ])
    .limit(10)
    .sort({name: 1})
    .select({name: 1, tags: 1});
    console.log('... ', courses);
}

// getCourses();

//Regular Expression
async function getCourses1() {
        const courses = await Course
        //start with sure
        .find({auther: /^Mosh/})

        //end with thapa
        .find({auther: /thapa$/i})

        //Contains Mosh
        .find({auther: /.*suresh*./i})
        .limit(10)
        .sort({name: 1})
        .select({name: 1, tags: 1});
        console.log('... ', courses);
    }
    
    // getCourses1();

    //to return match count
    async function getCourses2() {
        const courses = await Course
        .find({auther:'suresh', isPublished:true})
        .limit(10)
        .sort({name: 1})
        .count();
        console.log('... ', courses);
    }
    
    // getCourses2();

    //pagination
    async function pagination() {
        const pageNumber=2;
        const pageSize=10;
        //but in real world we send in query string
        //   /api/courses?pageNumber=2&pageSize=10

        const courses = await Course
        .find({auther:'suresh', isPublished:true})
        .skip((pageNumber-1)*pageSize)
        .limit(pageSize)
        .sort({name: 1})
        .count();
        console.log('... ', courses);
    }
    
    // pagination();

    async function updateCourse(id){
        const course = await Course.findById(id);
        if(!course) return;

        course.auther="mosh";
        course.name="React Course";

        // course.set({
        //     auther:"mosh",
        //     name:"React Course"
        // })
        const result = await course.save();
        console.log("result = ", result);
    }

    // updateCourse("62ea4bc841584b16688f508e");

    async function updateCourseDirectlyToDB(id){
        const result = await Course.updateOne({_id:id},{
            $set:{
                auther:"anil basnet",
                isPublished:false
            }
        })
        console.log("direct update to DB ", result);
    }

    // updateCourseDirectlyToDB("62ea4bc841584b16688f508e");

    async function removeCourse(id){
        const result = await Course.deleteOne({_id:id});
        // const result = await Course.deleteMany({_id:id});
        const delCourse = await Course.findByIdAndRemove(id);
        console.log("deleted course ", delCourse);
    }

    // removeCourse("62ea4bc841584b16688f508e");