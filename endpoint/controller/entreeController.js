import db from '../../models/index.js';

export const registerEntree = async (req, res) => {
    const {quantite, idStock} = req.body;
    let Date = new Date().toJSON().slice(0, 10);
    const status = "Transmise"
    try {
      const entree = await db.Entree.create({
        quantite,
        idStock,
        Date,
        status
      });
      res.status(201).json(entree);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
};

export const getEntree = async (req, res) => {
    const idStock = req.body;
    try{
    const list_entree = await db.Entree.findAll({ where: { idStock : idStock } });
    if (list_entree) {
        res.status(201).json(list_entree);
      } else {
        res.status(401).json({ error: 'Aucune entrée trouvée' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
};

export const changeStatus = async (req, res) => {
    const {id, status} = req.body;
    try{
        const entree = await db.Entree.findOne({ where: { id : id } });
        if (entree) {
            entree.status = status;
            entree.save();
            res.status(201);
          } else {
            res.status(401).json({ error: 'Aucune entrée trouvée' });
          }
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        }
};

export const getOneEntree = async (req, res) => {
    const id = req.body;
    try{
        const entree = await db.Entree.findOne({ where: { id : id } });
        if (entree) {
            res.status(201).json(list_entree);
          } else {
            res.status(401).json({ error: 'Aucune entrée trouvée' });
          }
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        }
};