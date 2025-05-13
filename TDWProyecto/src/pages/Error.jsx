import errorImage from '../assets/images/Error404.jpg';
const Error = (props) => {
    return (
        <div className="error-container" style={{ textAlign: 'center', margin: '0 auto' }}>
            <h1 className="error-title">Error 404</h1>
            <p className="error-message">{props.message  || "La página que estás buscando no existe."}</p>
            <img
                src={errorImage}
                style={{ maxWidth: '40%', borderRadius: '2rem' }}
                alt="Página no encontrada"
                className="error-image"
            />
        </div>
    );
}
export default Error;