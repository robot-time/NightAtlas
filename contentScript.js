// Create an iframe for the overlay
let overlayIframe = document.createElement('iframe');
overlayIframe.className = 'overlay';
overlayIframe.style.position = 'fixed';
overlayIframe.style.top = '0';
overlayIframe.style.left = '0';
overlayIframe.style.width = '100%';
overlayIframe.style.height = '100%';
overlayIframe.style.zIndex = '9999';
overlayIframe.style.border = 'none';
overlayIframe.style.backgroundColor = 'transparent';

// Create the overlay HTML content
const overlayHTML = `
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Overlay</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
  
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            background-color: #252525;
        }
        .content {
            font-size: 16px;
            color: #ffffff;
            width: 375px;
            background-color: #424242;
            border-radius: 5px;
            padding:  6px;
            margin-left: 100px;
            white-space: pre-wrap; /* Preserves line breaks and spaces */

        }
        .content2 {
            font-size: 16px;
            color: #ffffff;
            width: 375px;
            background-color: #424242;
            border-radius: 5px;
            padding:  6px;
            margin-left: 500px;
            white-space: pre-wrap; /* Preserves line breaks and spaces */

        }
        .content3 {
            font-size: 16px;
            color: #ffffff;
            width: 200Spx;
            background-color: #424242;
            border-radius: 5px;
            padding:  6px;
            margin-left: 900px;
            white-space: pre-wrap; /* Preserves line breaks and spaces */

        }
        .bold {
            font-weight: bold;
        }
            .sidebar {
                height: 100vh;
                width: 50px;
                position: fixed;
                top: 0;
                left: 0;
                background-color: #1c1c1c;
                color: #ffffff;
                padding: 15px;
            }

            .sidebar h2 {
                text-align: center;
            }

            .sidebar ul {
                list-style-type: none;
                padding: 0;
            }

            .sidebar ul li {
                margin: 15px 0;
            }

            .sidebar ul li a {
                color: #fff;
                text-decoration: none;
                display: block;
                padding: 10px;
                border-radius: 4px;
            }

            .sidebar ul li a:hover {
                background-color: #575757;
            }
      .material-symbols-outlined{
        color: #5a5fec;
      }
    </style>
</head>
<body>
    <div class="sidebar">
        <ul>
            <li><img src="https://i.imgur.com/DDLafqj.png" alt=""></li>
            <li><span class="material-symbols-outlined">home</span></li>
            <li><span class="material-symbols-outlined">person</span></li>
            <li><span class="material-symbols-outlined">menu_book</span></li>
            <li><span class="material-symbols-outlined">inbox</span></li>
            <li><span class="material-symbols-outlined">school</span></li>
            <li><span class="material-symbols-outlined">calendar_month</span></li>
        </ul>
    </div>
    <div class="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam bibendum facilisis luctus. Cras elit nibh, tempor sit amet consectetur ac, finibus ut mi. Etiam mattis efficitur ipsum. Nulla in vestibulum est, ac commodo turpis. Fusce non ex condimentum, iaculis lectus quis, laoreet lectus. Etiam non ex nec quam consectetur sagittis et non sem. Morbi elit augue, mollis euismod enim auctor, facilisis tincidunt velit. Praesent ut tempus quam. Pellentesque eget efficitur ante, a consectetur odio. Pellentesque vestibulum mi vitae augue accumsan, et consectetur erat sollicitudin. Etiam euismod velit lacus, in pellentesque sem pulvinar sollicitudin. Nunc et dapibus ex. Etiam cursus fringilla maximus. Duis id pharetra augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed nunc erat, rhoncus quis vehicula vitae, porta nec nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vel sem ultrices nisi ornare fermentum. Pellentesque lacinia at enim ac lacinia. Curabitur nec lorem sit amet magna convallis mollis at pulvinar urna. Maecenas egestas nibh ac posuere semper.</div>
    <div class="content2">Messages</div>
    <div class="content3">Miles Hedrick</div>
    <script>
        window.addEventListener('message', (event) => {
            if (event.data.type === 'UPDATE_TEXT') {
                let contentDiv = document.querySelector('.content');
                contentDiv.innerHTML = event.data.text;
            }
        });
    </script>
</body>
</html>
`;

// Function to create a Blob URL for the overlay HTML
function createOverlayBlobURL(html) {
    const blob = new Blob([html], { type: 'text/html' });
    return URL.createObjectURL(blob);
}

// Set the iframe source to the Blob URL of the overlay HTML
overlayIframe.src = createOverlayBlobURL(overlayHTML);
document.body.appendChild(overlayIframe);

// Function to pull and format all the text content of the nested div with id "ctl00_cp_divEvents"
function getTextFromUnderlyingPage() {
    let targetElement = document.querySelector('#ctl00_cp_divEvents');
    if (targetElement) {
        let text = targetElement.innerText;
        let lines = text.split('\n');
        let formattedLines = lines.map(line => {
            // Regular expression to match days of the week
            if (/Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday/.test(line)) {
                return `<div class="bold">${line}</div>`;
            }
            return `<div>${line}</div>`;
        });
        return formattedLines.join('');
    } else {
        return 'No text found';
    }
}

// Communicate with the iframe to send the formatted text
function updateOverlay() {
    let text = getTextFromUnderlyingPage();
    overlayIframe.contentWindow.postMessage({ type: 'UPDATE_TEXT', text: text }, '*');
}

// Add a delay before running the updateOverlay function
setTimeout(() => {
    updateOverlay();
    setInterval(updateOverlay, 5000); // Update every 5 seconds
}, 3000); // 3000ms delay (3 seconds)

// Optional: Listen for messages from the iframe (if needed)
window.addEventListener('message', (event) => {
    if (event.data.type === 'REQUEST_TEXT') {
        updateOverlay();
    }
});
