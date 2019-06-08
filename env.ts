import yaml from 'yaml'
import fs from 'fs'

const templateFile = './codegen_template.yml'
const template = fs.readFileSync(templateFile, 'utf-8')
const ymlObj = yaml.parse(template)
const token = process.env.GITHUB_GRAPHQL_API_TOKEN
const overwrite = {
  schema: [{
    'https://api.github.com/graphql': { headers: { Authorization: `bearer ${token}`, 'User-Agent': 'graphql-client-sandbox' } }
  }]
}

fs.writeFileSync('./codegen.yml', yaml.stringify({ ...ymlObj, ...overwrite }))

