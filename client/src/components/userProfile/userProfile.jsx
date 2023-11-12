

export default function NormalUserProfile({ profileData }) {
    return (
        <>
            <h3>{profileData.firstName} {profileData.lastName}</h3>
        </>
    );
}