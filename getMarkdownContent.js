const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);

getMarkdownContent();

function getMarkdownContent(url = "https://raw.githubusercontent.com/raven-os/nest/master/README.md") {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            container.innerHTML = marked(this.response);
        } else {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = `Failed to load!`;
            app.appendChild(errorMessage);
        }
    }
    request.send();
}