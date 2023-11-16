

export default function EditButtons({ setOnOrOff, onOrOff, handleSubmitChanges, editButtonC }) {
    return (
        <div id='edit-buttons-holder'>
            <button id='profile-edit-button' className='bi bi-pencil-square' onClick={(event) => {setOnOrOff(!onOrOff), onOrOff ?  handleSubmitChanges(event) : ''}}>{editButtonC}</button>
            <button id='profile-cancel-btn' style={{ display: onOrOff ? 'inline' : 'none', backgroundColor: '#e00000' }} onClick={() => setOnOrOff(false)} className='bi bi-x-circle'></button>
        </div>
    );
}