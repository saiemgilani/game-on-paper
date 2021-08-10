
import axios from 'axios'

const pages = ['cfb/2020/401212523.json']

const handler = async (req, res): Promise<void> => {
  if (req.query.id) {
    // a slow endpoint for getting repo data
    const query = req.query.id.replace('cfb/','')
    axios(`https://raw.githubusercontent.com/saiemgilani/cfbfastR-raw/main/pbp_json_final/${query}`)
    .then(resp => resp.data)
    .then(data => {
        res.json(data)
    })
    return
  }
    res.json(pages)

}

export default handler
