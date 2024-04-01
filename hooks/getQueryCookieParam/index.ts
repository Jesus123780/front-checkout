export const getQueryCookieParam = () => {
    const setCookie = async (queryParams: Record<string, string>) => {
        try {
            const response = await fetch(`/api/setCookie?${new URLSearchParams(queryParams)}`, {
              method: 'GET',
            });
      
            if (!response.ok) {
              throw new Error('Error al establecer las cookies');
            }
      
            const responseData = await response
            return responseData;
          } catch (error: any) {
            console.error('Error al establecer las cookies:', error.message);
            throw error;
          }
    };
  
    return { setCookie };
};
