import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    gender: String,
    name: {
        title: String,
        first: String,
        last: String,
    },
    location: {
        street: {
            number: Number,
            name: String,
        },
        city: String,
        state: String,
        country: String,
        postcode: String,
        coordinates: {
            latitude: String,
            longitude: String,
        },
        timezone: {
            offset: String,
            description: String,
        },
    },
    email: String,
    login: {
        uuid: String,
        username: String,
        password: String,
        salt: String,
        md5: String,
        sha1: String,
        sha256: String,
    },
    dob: {
        date: Date,
        age: Number,
    },
    registered: {
        date: Date,
        age: Number,
    },
    phone: String,
    cell: String,
    picture: {
        large: String,
        medium: String,
        thumbnail: String,
    },
    nat: String,
})

export default mongoose.models.User || mongoose.model("User", UserSchema)

