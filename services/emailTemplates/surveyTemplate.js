const keys = require('../../config/keys');

module.exports = (survey) => {
    return `
    <html>
        <body>
            <div style= "text-align: center;">
                <h3>We truly appreciate your feedback!</h3>
                <p>Thank you for answering the following question: </p>
                <p>${survey.body}</p>
                <div>
                    <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
                </div>
                <div>
                    <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
                </div>
            </div>
        </body>
    </html>
    `;
}