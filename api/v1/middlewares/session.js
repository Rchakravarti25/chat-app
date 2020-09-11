module.exports = function (app) {
	var sessionConnection = mysql.createConnection(options);
	var sessionStore = new MySQLStore({
		checkExpirationInterval: 900000,
		expiration: 10800000,
		createDatabaseTable: true,
		schema: {
			tableName: 'user_sessions',
			columnNames: {
				session_id: 'SessionID',
				expires: 'Expires',
				data: 'Data'
			}
		}
	}, sessionConnection);
	app.use(session({
		key: '69Atu22GZTSyDGW4sf4mMJdJ42436gAs',
		secret: '3dCE84rey8R8pHKrVRedgyEjhrqGT5Hz',
		store: sessionStore,
		resave: false,
		saveUninitialized: true
	}));
}