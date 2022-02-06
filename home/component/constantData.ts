export const NavArray: any = {
  services: 'Services',
  checks: 'Checks',
  'method-checks': 'Method Checks',
  methods: 'Methods',
  'module-instances': 'Module Instances',
  modules: 'Modules',
  systems: 'Systems',
  'system-types': 'System Types',
  'system-categories': 'Système catégories',
  'system-versions': 'System Versions',
  'environment-module-instances': 'Environment Module Instances',
  environments: 'Environments',
  platforms: 'Platforms',
  infrastructures: 'Infrastructures',
  'deployment-environments': 'Deployment Environments',
  contributors: 'Contributors',
  'contributors-module-instances': 'Contributors Module Instances',
  'contributors-services': 'Contributors Services',
  'contributor-actions': 'Contributors Actions',
  regions: 'Regions',
  brands: 'Brands',
  setups: 'Setups',
};

// ** Prefilled Data Proposition in select
export const PrefilledOptionsArray: any = {
  services: {
    categoryName: ['Connected assistance', 'Others'],
  },
  methods: {
    type: ['MODULE'],
  },
  environments: {
    type: ['DEV', 'STG', 'INT', 'PREPROD', 'PROD'],
  },
  'contributors-services': {
    contributorType: ['COMM', 'CAR DATA USAGE', 'TECHNICAL FEATURES'],
    actionType: ['BLACKLIST', 'DEACTIVATE', 'NONE'],
    diagnosticType: ['HIGH', 'NONE'],
  },
  'contributor-actions': {
    actionType: ['NONE', 'ACTIVATE', 'BLACKLIST', 'INITIATE'],
  },
  setups: {
    type: ['DEV', 'STG', 'INT', 'PREPROD', 'PROD'],
  },
};

// ** Url to get ids data from others table
export const IdsUrl: any = {
  'method-checks': [
    ['checks', 'methods'],
    ['checkId', 'methodId'],
  ],
  methods: [['module-instances'], ['moduleInstanceId']],
  modules: [['systems'], ['systemId']],
  'module-instances': [['modules'], ['moduleId']],
  systems: [['system-types'], ['systemTypeId']],
  'system-types': [['system-categories'], ['systemCategoryId']],
  'system-versions': [['systems'], ['systemId']],
  platforms: [['infrastructures'], ['infraId']],
  'environment-module-instances': [
    ['environments', 'module-instances'],
    ['environmentId', 'moduleInstanceId'],
  ],
  environments: [['platforms'], ['platformId']],
  'deployment-environments': [
    ['setups', 'environments', 'systems'],
    ['setupId', 'environmentId', 'systemId'],
  ],
  'contributors-module-instances': [
    ['contributors', 'module-instances'],
    ['contributorId', 'moduleInstanceId'],
  ],
  'contributors-services': [
    ['contributors', 'services'],
    ['contributorId', 'serviceId'],
  ],
  'contributor-actions': [
    ['contributors', 'setups'],
    ['contributorId', 'setupId'],
  ],
  setups: [
    ['brands', 'regions'],
    ['brandId', 'regionId'],
  ],
};

// ** Url to get ids data from others table and know if they are used
export const IdsUrlToKnowIfUse: any = {
  'system-types': 'systemTypeId',
  'system-categories': 'systemCategoryId',
  systems: 'systemId',
  checks: 'checkId',
  methods: 'methodId',
  modules: 'moduleId',
  'module-instances': 'moduleInstanceId',
  infrastructures: 'infraId',
  environments: 'environmentId',
  setups: 'setupId',
  services: 'serviceId',
  regions: 'regionId',
  brands: 'brandId',
  contributors: 'contributorId',
};
