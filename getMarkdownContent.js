const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);

const right = document.getElementById('right');
const containerRight = document.createElement('div');
containerRight.setAttribute('class', 'bd-toc-anchors');
right.appendChild(containerRight);


getMarkdownContent();

function getMarkdownContent(url = "https://raw.githubusercontent.com/raven-os/nest/master/README.md") {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // markdown to html
            container.innerHTML = marked(this.response);
            // remove old information in right sideebar
            while (containerRight.hasChildNodes()) {
                containerRight.removeChild(containerRight.lastChild);
            }
            // update information in right sidebar
            const listH2 = document.getElementsByTagName("h2");
            for (var i = 0; i < listH2.length; i++) {
                const li = document.createElement('li');
                const a = document.createElement('a')
                li.appendChild(a);
                containerRight.appendChild(li);
                a.href = '#' + listH2[i].id;
                a.innerHTML = listH2[i].innerHTML
            }
        } else {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = `Failed to load!`;
            app.appendChild(errorMessage);
        }
    }
    request.send();
}