document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['selectedTheme', 'selectedColor'], (data) => {
    if (chrome.runtime.lastError) {
      console.error('Error retrieving theme:', chrome.runtime.lastError);
    } else if (data.selectedTheme) {
      const cssVariables = getThemeVariables(data.selectedTheme, data.selectedColor || '#000000');
      applyCSSVariables(cssVariables);

      if (data.selectedTheme === 'theme7') {
        addCornerImage();
      } else {
        removeCornerImage();
      }
    }
  });
});

function applyCSSVariables(cssVariables) {
  console.log('Applying CSS Variables:', cssVariables);
  for (const [variable, value] of Object.entries(cssVariables)) {
    document.documentElement.style.setProperty(variable, value);
  }
}

function getThemeVariables(theme, selectedColor) {
  const baseVariables = {
    '--themeDarker': '#000000',
    '--themePrimary': '#000000',
    '--themeSecondary': '#000000',
    '--themeTertiary': '#000000',
    '--themeLight': '#000000',
    '--accent': '#000000'
  };

  switch (theme) {
    case 'theme1':
      return {
        ...baseVariables,
        '--themeDarker': '#36794e',
        '--themePrimary': '#1DB954',
        '--themeSecondary': '#63c987',
        '--themeTertiary': '#36794e',
        '--themeLight': '#1DB954'
      };
    case 'theme2':
      return {
        ...baseVariables,
        '--themeDarker': '#872a4f',
        '--themePrimary': '#ab0aa5',
        '--themeSecondary': '#ab0aa5',
        '--themeTertiary': '#ab0aa5',
        '--themeLight': '#ab0aa5'
      };
    case 'theme3':
      return {
        ...baseVariables,
        '--accent': '#f46d25',
        '--themePrimary': '#e45507',
        '--themeSecondary': '#e45507',
        '--themeTertiary': '#e45507',
        '--themeLight': '#e45507'
      };
    case 'theme4':
      return {
        ...baseVariables,
        '--background': selectedColor,
        '--text': selectedColor,
        '--themePrimary': selectedColor,
        '--themeSecondary': selectedColor,
        '--themeTertiary': selectedColor,
        '--themeLight': selectedColor,
        '--accent': selectedColor
      };
    case 'theme5':
      return {
        ...baseVariables,
        '--background': 'linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)'
      };
    case 'theme6':
      return {
        ...baseVariables,
        '--accent': '#f46d25',
        '--themePrimary': '#3632D7',
        '--themeSecondary': '#5A5FEC',
        '--themeTertiary': '#C6C9FF',
        '--themeLight': '#3632D7'
      };
    case 'theme7':
      return {
        ...baseVariables,
        '--themePrimary': '#e1cdcb',
        '--themeSecondary': '#e1cdcb',
        '--themeTertiary': '#e1cdcb',
        '--themeLight': '#e1cdcb'
      };
    case 'theme8':
      return {
        ...baseVariables,
        '--themeDarker': selectedColor,
        '--themePrimary': selectedColor,
        '--themeSecondary': selectedColor,
        '--themeTertiary': selectedColor,
        '--themeLight': selectedColor,
        '--accent': selectedColor
      };
    default:
      return baseVariables;
  }
}

function addCornerImage() {
  let img = document.getElementById('corner-image');
  if (!img) {
    img = document.createElement('img');
    img.id = 'corner-image';
    img.src = 'https://th.bing.com/th/id/R.56a19587d370ba5a50de04a8b84d4e3d?rik=fQKVtvVJ2hgZZg&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fcherry-blossom-silhouette-png%2fcherry-blossom-silhouette-png-24.png&ehk=TeUZBOS7BXPN9i5Tq3wcw5OtDwXVkUGIbIupIqv4gZA%3d&risl=&pid=ImgRaw&r=0';
    img.style.position = 'fixed';
    img.style.bottom = '-30px';
    img.style.right = '-30px';
    img.style.width = '300px';
    img.style.height = '300px';
    img.style.zIndex = '1000';
    img.style.pointerEvents = 'none';
    img.style.transform = 'scaleX(-1)';
    document.body.appendChild(img);
  }
}

function removeCornerImage() {
  const img = document.getElementById('corner-image');
  if (img) {
    img.remove();
  }
}
