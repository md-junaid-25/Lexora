const UserGreeting = (props) => {

    return(
        <div className="greeting">
            <h2>Hey {props.username}</h2>
        </div>
    )

};

export default UserGreeting;