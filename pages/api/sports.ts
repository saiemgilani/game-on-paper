
import axios from 'axios'

const projects = [
  'saiemgilani/cfbfastR-raw', '2020/401212523.json','saiemgilani/kenpomR-data', 'saiemgilani/wehoop', 'saiemgilani/cfbrecruitR'
]

const handler = async (req, res): Promise<void> => {
  if (req.query.id) {
    // a slow endpoint for getting repo data
    axios(`https://raw.githubusercontent.com/saiemgilani/cfbfastR-raw/main/pbp_json_final/${req.query.id}`)
    .then(resp => resp.data)
    .then(data => {
        res.json(data)
    })
    return
  }
    res.json(projects)

}

export default handler
