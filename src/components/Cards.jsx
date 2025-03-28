
function Card ({children, reference = null, }) {

    return (
        <div className="card-container" >
            <div className="card" ref={reference}>
                {children}
            </div>
        </div>
    )
}

export default Card;
