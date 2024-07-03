import db from '../../models/index.js';
import stockController from '../../endpoint/controller/stockController.js';

export const registerProduit = async (req, res) => {
    const nom = req.body;
    
    try {
      const produit = await db.Produit.create({
        nom
      });
      res.status(201).json(produit);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
};

export const getProduitByName = async (req, res) => {
    const nom = req.body;
    try{
    const produit = await db.Produit.findOne({ where: { nom : nom } });
    if (produit) {
        res.status(201).json(produit);
      } else {
        res.status(401).json({ error: 'Aucun produit trouver' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
};

export const getProduitById = async (req, res) => {
    const id = req.body;
    try{
        const produit = await db.Produit.findOne({ where: { id : id } });
        if (produit) {
            res.status(201).json(produit);
        } else {
            res.status(401).json({ error: 'Aucun produit trouver' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllProduit = async (req, res) => {
    
    try{
    const list_produit = await db.Produit.findAll();
    if (list_produit) {
        res.status(201).json(list_produit);
      } else {
        res.status(401).json({ error: 'Aucun produit trouver' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteProduit = async (req, res) => {
    const id = req.body;
    try{
        let list_stock = await db.Stock.findAll({ where: {idProduit: id}});
        let list_stock_ids = list_stock.map(stock => stock.id)
        for (const stock_id of list_stock_ids){
            stockController.BackDeleteStock(stock_id)
        };
        const produit_delete = await db.Produit.destroy({ where: { id : id } });
        if (produit_delete) {
            res.status(201);
          } else {
            res.status(401).json({ error: 'Aucun produit trouver' });
          }
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        }
};

