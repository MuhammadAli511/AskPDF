import mongoose, { Schema } from 'mongoose'

interface Document {
    filename: string;
    content: string;
}

const documentSchema: mongoose.Schema<Document> = new Schema({
    filename: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
})

const Document: mongoose.Model<Document> = mongoose.model<Document>('Document', documentSchema)

export default Document
