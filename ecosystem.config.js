module.exports = {
	apps: [
		{
			name: 'Malani_Employee_Portal',
			script: 'server/server.js',
			instances: 'max',
			env: {
				NODE_ENV: 'development',
			},
			env_production: {
				NODE_ENV: 'production',
			},
		},
	],
};
