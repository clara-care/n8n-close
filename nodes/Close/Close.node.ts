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
					{
						name: 'Send',
						value: 'send',
						action: 'Send SMS message',
						description: 'Send SMS message',
						routing: {
							request: {
								method: 'POST',
								url: '/activity/sms',
								body: {
									status: 'outbox',
								},
							},
						},
					},
				],
			},
			{
				displayName: 'SMS Text',
				description: 'Text of the SMS you are sending',
				required: true,
				name: 'smsText',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['sms'],
						operation: ['send'],
					},
				},
				routing: {
					request: {
						body: {
							text: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Send From',
				description:
					'Phone number to send from. Must exist in Close and start with country code (e.g. +1).',
				required: true,
				name: 'sendFrom',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['sms'],
						operation: ['send'],
					},
				},
				routing: {
					request: {
						body: {
							local_phone: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Send To',
				description: 'Phone number to send to. Must start with country code (e.g. +1).',
				required: true,
				name: 'sendTo',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['sms'],
						operation: ['send'],
					},
				},
				routing: {
					request: {
						body: {
							remote_phone: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Lead ID',
				description: 'ID of the lead to send to',
				required: true,
				name: 'leadId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['sms'],
						operation: ['send'],
					},
				},
				routing: {
					request: {
						body: {
							lead_id: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Contact ID',
				description: 'ID of the contact to send to',
				required: true,
				name: 'contactId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['sms'],
						operation: ['send'],
					},
				},
				routing: {
					request: {
						body: {
							contact_id: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'SMS Lead ID',
				description: 'ID of the lead in Close',
				required: true,
				name: 'smsLeadID',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['sms'],
						operation: ['getAll'],
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
