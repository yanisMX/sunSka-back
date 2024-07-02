import db from '../../models/index.js';

export const registerStock = async (req, res) => {
    const {idProduit, idBar, quantite, seuilAlerte} = req.body;

    try {
      const stock = await db.Stock.create({
        idProduit,
        idBar,
        quantite,
        seuilAlerte
      });
      res.status(201).json(stock);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
};

export const getStockById = async (req, res) => {
    const id = req.body;
    try{
    const stock = await db.Stock.findOne({ where: { id : id } });
    if (stock) {
        res.status(201).json(stock);
      } else {
        res.status(401).json({ error: 'Aucune entrée trouvée' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
};

export const getStockByIdBar = async (req, res) => {
    const idBar = req.body;
    try{
    const list_stock = await db.Stock.findAll({ where: { idBar : idBar } });
    if (list_stock) {
        res.status(201).json(list_stock);
      } else {
        res.status(401).json({ error: 'Aucune entrée trouvée' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
};

export const getStockByIdProduit = async (req, res) => {
    const idProduit = req.body;
    try{
    const list_stock = await db.Stock.findAll({ where: { idProduit : idProduit } });
    if (list_stock) {
        res.status(201).json(list_stock);
      } else {
        res.status(401).json({ error: 'Aucune entrée trouvée' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllStock = async (req, res) => {
    try{
        const list_stock = await db.Stock.findAll();
        if (list_stock) {
            res.status(201).json(list_stock);
          } else {
            res.status(401).json({ error: 'Aucune entrée trouvée' });
          }
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        }
};