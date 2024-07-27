import mongoose from 'mongoose';
import { config } from '$lib/config';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

console.log('init mongo', config.mongoUrl)

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
    name: String,
    surname: String,
    email: String,
    username: String,
    paypal_email: String,
    country: {
        type: Number,
        ref: 'State'
    },
    region: {
        type: Number,
        ref: 'Region'
    },
    province: {
        type: Number,
        ref: 'Province'
    },
    university: {
        type: ObjectId,
        ref: 'University'
    },
    degree: {
        type: ObjectId,
        ref: 'Degree'
    },
    year: String,
    semester: String,
    student_id: String,
    league_xp: {type: Number, default: 0},
    league_position: Number,
    league_level: {type: Number, default: 0},
    courses: [
        {
            course: {
                type: ObjectId,
                ref: 'Course'
            },
            bookmark: {
                type: ObjectId,
                ref: 'File'
            }
        }
    ],
    dna: {type: Number, default: 0},
    rna: {type: Number, default: 0},
    streak: {type: Number, default: 0},
    xp: {type: Number, default: 0},
    role: {type: String, default: 'user'},
    hash: String,
}, {
    timestamps: true
})
UserSchema.index({email: 1}, {unique: true})
UserSchema.index({username: 1}, {unique: true})

UserSchema.pre('findOne', function (next) {
    this.populate('country')
    this.populate('region')
    this.populate('province')
    this.populate('university')
    this.populate('degree')
    next()
})

UserSchema.pre('findOneAndUpdate', function (next) {
    this.populate('country')
    this.populate('region')
    this.populate('province')
    this.populate('university')
    this.populate('degree')
    next()
})

const UniversitySchema = new Schema({
    name: String,
    type: String,
    country: {
        type: Number,
        ref: 'State'
    },
    region: {
        type: Number,
        ref: 'Region'
    },
    province: {
        type: Number,
        ref: 'Province'
    },
}, {
    timestamps: true
})
UniversitySchema.index({name: 1})

const DegreeSchema = new Schema({
    name: String,
    type: String,
}, {
    timestamps: true
})
DegreeSchema.index({name: 1, type: 1}, {unique: true})

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
    cfu: Number,
    professors: [String],
    code: String,
    year: Number,
    semester: Number,
    tags: [String],
    description: String,
    chapters: [
        {
            type: ObjectId,
            ref: 'Directory'
        }
    ],
    extra_content: {
        type: ObjectId,
        ref: 'Directory'
    },
    reviews: [
        {
            type: ObjectId,
            ref: 'Review'
        }
    ],
    rating: Number,
    university: {
        type: ObjectId,
        ref: 'University'
    },
    degree: {
        type: ObjectId,
        ref: 'Degree'
    },
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
    this.populate('university')
    this.populate('degree')
    next()
})

CourseSchema.pre('findOne', function (next) {
    this.populate('chapters')
    this.populate('reviews')
    this.populate('extra_content')
    this.populate('university')
    this.populate('degree')
    next()
})

const GridSchema = new Schema({}, {strict: false});

const Grid = mongoose.models.Grid               || mongoose.model('Grid', GridSchema, 'fs.files');
const Config = mongoose.models.Config           || mongoose.model('Config', ConfigSchema);
const User = mongoose.models.User               || mongoose.model('User', UserSchema);
const State = mongoose.models.State             || mongoose.model('State', StateSchema)
const Region = mongoose.models.Region           || mongoose.model('Region', RegionSchema)
const Province = mongoose.models.Province       || mongoose.model('Province', ProvinceSchema)
const University = mongoose.models.University   || mongoose.model('University', UniversitySchema)
const Degree = mongoose.models.Degree           || mongoose.model('Degree', DegreeSchema)
const Review = mongoose.models.Review           || mongoose.model('Review', ReviewSchema);
const Directory = mongoose.models.Directory     || mongoose.model('Directory', DirectorySchema)
const File = mongoose.models.File               || mongoose.model('File', FileSchema);
const Course = mongoose.models.Courses          || mongoose.model('Courses', CourseSchema);

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
    University,
    Degree,
    File
};