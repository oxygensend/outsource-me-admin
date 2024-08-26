import { useDelete, useRecordContext } from "react-admin";

const DeleteButton = () => {
    const record = useRecordContext();
    const [deleteOne, { isPending, error }] = useDelete(
        'static-data/technologies',
        { id: record.id, previousData: record }
    );
    const handleClick = () => {
        deleteOne();
    }
    if (error) { return <p>ERROR</p>; }
    return <button disabled={isPending} onClick={handleClick}>Delete</button>;
};