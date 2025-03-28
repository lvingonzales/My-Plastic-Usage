
function Card ({children, reference = null, focus = null}) {

    return (
        <div className="card-container" >
            <div className="card" ref={reference} data-focus={focus}>
                <div className="card-back"></div>
                {children}
            </div>
        </div>
    )
}

export default Card;
