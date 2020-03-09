import Swal from "sweetalert2";

const onUnauthenticated = () => {
    sessionStorage.clear();
    window.location.href = '/#/auth/sessionExpired';
};
const onGatewayTimeout = () => {
    Swal.fire({
        type: 'error',
        title: 'Server Connection Error',
        allowOutsideClick: false
    });
};

const GET = (url, options) => {
    
    let headers = {};
    if(options !== undefined) {
        if(options.headers !== undefined) {
            headers = options.headers;
        }
    }

    return new Promise((resolve, reject) => {
        
        fetch(url, {
            method: 'GET',
            headers: headers,
        })
        .then((response) => {
            if(response.ok) {
                resolve(response);
            }else {
                if(response.status === 401) {
                    onUnauthenticated();
                    return;
                }
                if(response.status === 504) {
                    onGatewayTimeout();
                }
                reject(response);
            }
        })
        .catch((error) => {
            reject(error);
        })
    });
}

const POST = (url, params, options) => {

    let headers = {};
    if(options !== undefined) {
        if(options.headers !== undefined) {
            headers = options.headers;
        }
    }
    
    return new Promise((resolve, reject) => {
     
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: params
        })
        .then((response) => {
            if(response.ok) {
                resolve(response);
            }else {
                if(response.status === 401) {
                    onUnauthenticated();
                    return;
                }
                if(response.status === 504) {
                    onGatewayTimeout();
                    return;
                }
                reject(response);
            }
        })
        .catch((error) => {
            reject(error);
        })
    });
}

const PUT = (url, params, options) => {
    
    let headers = {};
    if(options !== undefined) {
        if(options.headers !== undefined) {
            headers = options.headers;
        }
    }

    return new Promise((resolve, reject) => {
        
        fetch(url, {
            method: 'PUT',
            headers: headers,
            body: params
        })
        .then((response) => {
            if(response.ok) {
                resolve(response);
            }else {
                if(response.status === 401) {
                    onUnauthenticated();
                    return;
                }
                if(response.status === 504) {
                    onGatewayTimeout();
                    return;
                }
                reject(response);
            }
        })
        .catch((error) => {
            reject(error);
        })
    });

}

const DELETE = (url, params, options) => {

    let headers = {};
    if(options !== undefined) {
        if(options.headers !== undefined) {
            headers = options.headers;
        }
    }

    return new Promise((resolve, reject) => {
     
        fetch(url, {
            method: 'DELETE',
            headers: headers,
            body: params
        })
        .then((response) => {
            if(response.ok) {
                resolve(response);
            }else {
                if(response.status === 401) {
                    onUnauthenticated();
                    return;
                }
                if(response.status === 504) {
                    onGatewayTimeout();
                    return;
                }
                reject(response);
            }
        })
        .catch((error) => {
            reject(error);
        })
    });
}

export default {
    GET,
    POST,
    PUT,
    DELETE,
}