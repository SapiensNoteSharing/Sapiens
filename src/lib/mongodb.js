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
    university_name: String,
    faculty_name: String,
    faculty_type: String,
    faculty_code: String,
    curriculum_code: String,
    curriculum_name: String,
    year: String,
    semester: String,
    student_id: String,
    courses: [ObjectId],
    dna: {type: Number, default: 0},
    rna: {type: Number, default: 0},
    streak: {type: Number, default: 0},
    xp: {type: Number, default: 0},
    hash: String,
    role: {type: String, default: 'user'},
}, {
    timestamps: true
})
UserSchema.index({email: 1})

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
    university_name: String,
    name: String,
    code: String,
    faculty_name: String,
    faculty_type: String,
    faculty_code: String,
    sector_code: String,
    curriculum_code: [String],
    curriculum_name: [String],
    cfu: Number,
    professors: [String],
    year: String,
    semester: String,
    tags: [String],
    description: String,
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

const ProvinceSchema = new Schema({
    _id: Number,
    name: String,
    region: {
        type: Number,
        ref: 'Region'
    },
    state: {
        type: Number,
        ref: 'State'
    }
})

const RegionSchema = new Schema({
    _id: Number,
    state: {
        type: Number,
        ref: 'State' 
    },
    name: String
})

const StateSchema = new Schema({
    _id: Number,
    name: String,
})

CourseSchema.pre('find', function (next) {
    this.populate('chapters')
    this.populate('reviews')
    this.populate('extra_content')
    next()
})

CourseSchema.pre('findOne', function (next) {
    this.populate('chapters')
    this.populate('reviews')
    this.populate('extra_content')
    next()
})

const GridSchema = new Schema({}, {strict: false});

const Grid = mongoose.models.Grid           || mongoose.model('Grid', GridSchema, 'fs.files');
const Config = mongoose.models.Config       || mongoose.model('Config', ConfigSchema);
const User = mongoose.models.User           || mongoose.model('User', UserSchema);
const State = mongoose.models.State         || mongoose.model('State', StateSchema)
const Region = mongoose.models.Region       || mongoose.model('Region', RegionSchema)
const Province = mongoose.models.Province   || mongoose.model('Province', ProvinceSchema)
const Review = mongoose.models.Review       || mongoose.model('Review', ReviewSchema);
const Directory = mongoose.models.Directory || mongoose.model('Directory', DirectorySchema)
const File = mongoose.models.File           || mongoose.model('File', FileSchema);
const Course = mongoose.models.Courses      || mongoose.model('Courses', CourseSchema);

export { 
    ObjectId,
    Grid,
    GridFs, 
    Config, 
    User,
    State,
    Region,
    Province,
    Review,
    Course,
    Directory,
    File
};