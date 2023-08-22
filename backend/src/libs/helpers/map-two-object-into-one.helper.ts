function mapTwoObjectsIntoOne<T, U>(object1: T, object2: U): T & U {
    return {
        ...object1, ...object2
    }
}

export { mapTwoObjectsIntoOne }