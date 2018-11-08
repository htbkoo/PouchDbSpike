export function addItem(db, title: string) {
    let item = {
        _id: new Date().toISOString(),
        title,
        completed: false
    };
    return db.put(item)
        .then(data => {
            console.log('Successfully posted a todo!');
            console.log(data);
            return data;
        })
        .catch(error => console.error(error));
}