import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class Close implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Close CRM',
		name: 'close',
		icon: 'file:close.svg',
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Close CRM',
		version: 1,
		defaults: {
			name: 'Close CRM',
		},
		inputs: ['main'],
		outputs: ['main'],
		group: ['transform'],
		credentials: [
			{
				name: 'closeApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.close.com/api/v1/',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				default: 'lead',
				noDataExpression: true,
				options: [
					{
						name: 'Lead',
						value: 'lead',
					},
					{
						name: 'SMS',
						value: 'sms',
					},
				],
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				default: 'getAll',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['sms'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						action: 'Fetch SMS messages',
						description: 'Get SMS messages',
						routing: {
							request: {
								method: 'GET',
								url: '/activity/sms',
							},
						},
					},
				],
			},
			{
				displayName: 'SMS Lead ID',
				description: 'ID of the lead in Close who you want to fetch SMS for',
				required: true,
				name: 'smsLeadID',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['sms'],
					},
				},
				routing: {
					request: {
						qs: {
							lead_id: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				default: 'get',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['lead'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Find lead',
						description: 'Find a lead from Close',
						routing: {
							request: {
								method: 'GET',
							},
						},
					},
				],
			},
			{
				displayName: 'Lead ID',
				description: 'ID of lead in Close',
				required: true,
				name: 'leadID',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['lead'],
					},
				},
				routing: {
					request: {
						url: '=/lead/{{$value}}',
					},
				},
			},
		],
	};
}
