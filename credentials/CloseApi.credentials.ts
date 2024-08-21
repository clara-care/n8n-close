import { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class CloseApi implements ICredentialType {
	name = 'CloseApi';
	displayName = 'Close CRM API';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			auth: {
				username: '={{$credentials.apiKey}}',
				password: '',
			},
		},
	};
}
