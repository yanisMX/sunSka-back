import db from '../../models/index.js';

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

export const getProduit = async (req, res) => {
    const nom = req.body;
    try{
    const produit = await db.Produit.findOne({ where: { nom } });
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
    const nom = req.body;
    try{
        const produit_delete = await db.Produit.destroy({ where: { nom } });
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

