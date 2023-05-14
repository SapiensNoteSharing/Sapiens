import mongoose from 'mongoose';
import { config } from '$lib/config';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

mongoose.connect(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const conn = mongoose.connection;

let GridFs;
conn.once('open', () => {
    GridFs = new mongoose.mongo.GridFSBucket(conn.db);
});

const ConfigSchema = new Schema({
    tenant: {
        type: String,
        unique: true
    },
    apikey: String,
    organization: Object,
    networks: [Object],
    devices: [Object],
    vendors: Object,
}, {
    timestamps: true
});

const UserSchema = new Schema({
    courses: [ObjectId],
    balance: Number,
    name: String,
    surname: String,
    email: String,
}, {
    timestamps: true
})


const CourseSchema = new Schema({
    name: String,
    CFU: Number,
    code: String,
    cdl_code: String,
    cdl_name: String,
    curriculum_code: String,
    curriculum_name: String,
    professors: [String],
    degree: String,
    year: String,
    semester: String,
    tags: [String],
    favourite: Boolean,
    in_cart: Boolean,
    owned: Boolean,
    content: "",
    chapters: [
        {
            title: String,
            paragraphs: [
                {
                    title: String,
                    content: String
                }
            ]
        }
    ],
    rating: Number,
    reviews_number: Number,
    cheatsheet: String,
    exercices: [
        {
            argument: String,
            data: String
        }
    ],
    oral_questions: String
}, {
    timestamps: true
})

const FileSchema = new Schema({
    content: String,
    
})


const GridSchema = new Schema({}, {strict: false});

const Grid = mongoose.model('Grid', GridSchema, 'fs.files');
const Config = mongoose.model('Config', ConfigSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Courses', CourseSchema);


export { 
    ObjectId, 
    GridFs, 
    Config, 
    User,
    Course
};
