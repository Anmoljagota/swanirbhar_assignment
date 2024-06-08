
export const getData = async () => {
    try {
        const response = await fetch(`${BASE_URL}/task`);
        const data = await response.json();
        return data.Data;
      } catch (error) {
        console.error('Error getting count:', error);
      }
  };



export const addData = async (data) => {
    console.log('addData:', data)
    try {
      await fetch(`${BASE_URL}/task/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };