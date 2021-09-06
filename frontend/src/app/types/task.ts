interface iTask {
    _id?: string,
    projectId: string,
    name: string,
    deadline: Date,
    created_at: Date,
    updated_at?: Date,
    done: boolean | false,
}

export default iTask;