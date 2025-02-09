import Professor from "./Produto.js";
import Pessoa from "./Pessoa.js";
import Usuario from "./Usuario.js";

await Professor.sync()
await Pessoa.sync();
await Usuario.sync();
