const Message = ({message}) => {
    return (
        <div>
            <p>
                {message.sender}: <br />

                {message.content}
            </p>
        </div>
    )
}


export default Message;