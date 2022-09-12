import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';



const MiApi = () => {
    //Se definen los estados que utilizaremos
    const [birds, setBirds] = useState(""); // Estado que guarda los datos de la Api
    const [birdsSearch, setBirdsSearch] = useState([]); // Estado que guarda el resultado de busqueda
    const [search, setSearch] = useState(""); //Estado que guarda cada entrada del input 
// 2. Función que consulta la API

const ApiAsk = async () => {
    try{
        const url = 'https://aves.ninjas.cl/api/birds';
        const response = await fetch(url)
        const datas = await response.json()
        const birdsData=datas.map(data => {
        const namebird = data.name
        const imagebird = data.images
        return {"id": data.uid,"name": namebird.spanish, "latin": namebird.latin, "url": imagebird.main}
        })
        setBirds(birdsData)
        setBirdsSearch(birdsData)
    } catch(e){
        alert(e.message);
       }
}
 // 3. LLamamos al función que consume la API al momento de montar el componente
  useEffect(() => {
  ApiAsk();
  }, []);
  
  const searchBird = (e) => {
  e.preventDefault();
  if (!search.trim()) {
    alert("Debe escribir algo");
    return;
  }
  const newBirds = birds.filter((bird) => bird.name.includes(search))
  if(newBirds.length===0){
    alert("Prueba con otra palabra");
    return;
  }   
  setBirdsSearch(newBirds.sort((bird1,bird2) => {
    if(bird1.name < bird2.name){
      return -1; 
    }
    else if(bird1.name > bird2.name){
      return 1; 
    }
    else{
      return 0; 
    }  
  }));
}; 

  return (
<>
<div className='container'>
<h1>Aves de Chile</h1>
<Form className="d-flex" role="search" onSubmit={searchBird}>
<p>Buscador de aves</p>
<input
className="form-control me-2"
type="search"
placeholder="Search"
aria-label="Search"
onChange={(e) => setSearch(e.target.value)}></input>
<Button variant="success" type="submit">Buscar</Button>
</Form>
</div>
<Container className='aves'>  
{birdsSearch.map(bird => <Card key={bird.id} className= 'mb-2' style={{ width: '18rem'}}>
      <Card.Img variant="top" src={bird.url} />
      <Card.Body>
        <Card.Title>{bird.name}</Card.Title>
        <Card.Text>
        Nombre científico: {bird.latin} 
        </Card.Text>
      </Card.Body>
    </Card>
)} 
</Container>
</>  
)
}

export default MiApi