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

const courseAutoPopulate = (next) => {
    this.populate('content')
}

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
    name: String,
    surname: String,
    email: String,
    country: String,
    region: String,
    city: String,
    university_region: String,
    university_city: String,
    faculty: String,
    degree_type: String,
    courses: [ObjectId],
    balance: Number,
    hash: String,
    role: String,
}, {
    timestamps: true
})

const ReviewSchema = new Schema({
    written_by: String,
    description: String,
    rating: Number
}, {
    timestamps: true
})

const FileSchema = new Schema({
    name: String,
    content: String,
    path: String,
    sha: String
}, {
    timestamps: true
})

const DirectorySchema = new Schema({
    name: String,
    files: [
        {
            type: ObjectId,
            ref: 'File'
        }
    ],
    directories: [
        {
            type: ObjectId,
            ref: 'Directory'
        }
    ],
    path: String,
    sha: String
}, {
    timestamps: true
})

DirectorySchema.pre('find', function (next) {
    this.populate('directories');
    this.populate('files', '-content')
    next()
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
    chapters: [
        {
            type: ObjectId,
            ref: 'Directory'
        }
    ],
    reviews: [
        {
            type: ObjectId,
            ref: 'Review'
        }
    ],
    rating: Number,
    extra_content: {
        type: ObjectId,
        ref: 'Directory'
    }
}, {
    timestamps: true
})
CourseSchema.pre('find', function (next) {
    this.populate('chapters')
    this.populate('reviews')
    this.populate('extra_content')
    next()
})

const GridSchema = new Schema({}, {strict: false});

const Grid = mongoose.model('Grid', GridSchema, 'fs.files');
const Config = mongoose.model('Config', ConfigSchema);
const User = mongoose.model('User', UserSchema);
const Review = mongoose.model('Review', ReviewSchema);
const Directory = mongoose.model('Directory', DirectorySchema)
const File = mongoose.model('File', FileSchema);
const Course = mongoose.model('Courses', CourseSchema);


export { 
    ObjectId,
    Grid,
    GridFs, 
    Config, 
    User,
    Review,
    Course,
    Directory,
    File,
    mongoose
};
