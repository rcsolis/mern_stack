interface iProject {
    _id?: string,
    name: string,
    description: string,
    created_at: Date,
    updated_at?: Date,
    done: boolean | false,
}

export default iProject;