pm.main.value('dpdConfig', { 
    collections: [
    	'products',
    	'entries'
    ], 
    serverRoot: 'http://192.168.30.74:3000/', // optional, defaults to same server
    socketOptions: { reconnectionDelayMax: 3000 }, // optional socket io additional configuration
    useSocketIo: false, // optional, defaults to false
    noCache: true // optional, defaults to false (false means that caching is enabled, true means it disabled)
});