export const ConfirmationAlert = ({
    title, subtitle, affirmativeText, handleAffirmative, cancelText, handleCancel,
}) => (
    <div className="alert alert-warning alert-dismissible fade show mt-4" role="alert">
        <div><strong>{title}</strong></div>
        {subtitle && <div>{subtitle}</div>}
        <button type="button" className="btn btn-warning mt-3" onClick={handleAffirmative}>{affirmativeText}</button>
        <button type="button" className="btn btn-primary mt-3 ms-2" onClick={handleCancel}>{cancelText}</button>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleCancel}></button>
    </div>
);
