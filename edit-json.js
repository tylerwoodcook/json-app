// Fetch the JSON file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Function to create an editor interface
    function createEditor(jsonData) {
      const editorDiv = document.getElementById('editor');

      // Loop through the keys in the JSON and create input fields
      for (let key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
          const input = document.createElement('input');
          input.setAttribute('type', 'text');
          input.setAttribute('value', jsonData[key]);
          
          // Update JSON data on input change
          input.addEventListener('input', (event) => {
            jsonData[key] = event.target.value;
          });

          const label = document.createElement('label');
          label.textContent = `${key}: `;
          label.appendChild(input);
          
          editorDiv.appendChild(label);
        }
      }

      // Create a save button
      const saveButton = document.createElement('button');
      saveButton.textContent = 'Save Changes';
      saveButton.addEventListener('click', () => {
        // Save the updated JSON data to the file (assuming you have a server-side endpoint to handle this)
        fetch('save_data.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(jsonData)
        })
        .then(response => {
          // Handle response if needed
        })
        .catch(error => {
          // Handle error if needed
        });
      });

      editorDiv.appendChild(saveButton);
    }

    // Call the function with the fetched JSON data
    createEditor(data);
  })
  .catch(error => {
    console.log('Error fetching JSON file', error);
  });
