

export default function EditButtons({ setOnOrOff, onOrOff, handleSubmitChanges, editButtonC }) {
    return (
        <div id='edit-buttons-holder' style={{ height: 60, display: 'flex'}}>
            <button id='profile-edit-button' className='bi bi-pencil-square' onClick={(event) => {setOnOrOff(!onOrOff), onOrOff ?  handleSubmitChanges(event) : ''}} style={{ marginRight: 6}}>{editButtonC}</button>
            <button id='profile-cancel-btn' style={{ display: onOrOff ? 'inline' : 'none', backgroundColor: '#e00000' }} onClick={() => setOnOrOff(false)} className='bi bi-x-circle'></button>
        </div>
    );
}