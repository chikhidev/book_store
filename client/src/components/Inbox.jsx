const Inbox = ({inbox}) => {
    return (
        inbox.messages.map(message => {
            return (<div>{message.content}</div>)
        })
    )
}

export default Inbox