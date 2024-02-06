export const Notification = ({fade}) => {
    return(
        <div className={`notification-wrapper ${fade && 'fade'}`}>
            Link copied and ready to share!
        </div>
    )
}