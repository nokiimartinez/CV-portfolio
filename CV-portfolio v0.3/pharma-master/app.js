// Déclaration de la page principale pour suivre la navigation
var currentpage = "accueil";


// Fonction qui sauvegarde un objet dans le localstorage
function saveLS(obj_name,obj){
	if(obj === "null" || typeof(obj) === "object"){
		obj_to_json = JSON.stringify(obj);
		window.localStorage.setItem(obj_name,obj_to_json);
		console.log("Mise à jour localStorage de l'objet '"+obj_name+"' :");
		console.log(obj);
		return true;
	}
	console.log("Erreur lors de l'enregistrement en storageLocal de l'objet '"+obj_name+"'");
	console.log("Contenu de l'objet : "+obj);
	return false;
}


//Fonction qui récupère un élément du localStorage puis qui retourne son objet
function getLS(nom){
	var val = window.localStorage.getItem(nom);
	if(val !== "null"){
		json_to_obj = JSON.parse(val);
		if(typeof(json_to_obj) === "object"){
			console.log("Récupération en localStorage de l'objet '"+nom+"' :");
			console.log(json_to_obj);
			return json_to_obj;
		}
	}
	return {};
}


// Déclaration de mes variables globales
var stock = {};
var clients = {};
var employes = {};
var fournisseurs = {};


// Initialisation des données enregistrées en localStorage sur mes variables globales
stock = getLS("stock");
clients = getLS("clients");
employes = getLS("employes");
fournisseurs = getLS("fournisseurs");



// Fonction de suppression d'un élément dans un objet
function deleteItem(item_name,obj_name,obj){
    if(getLS(obj_name,obj)){
        var obj_tab=getLS(obj);
        delete obj_tab[item_name];
        saveLS(obj_name,obj_tab);
    }else{
        return alert("il n'existe pas");
    }
}


// Fonction de recherche d'un élément dans un objet 
function searchItem(name_item,obj_name){
	let obj = getLS(obj_name);
	if(obj && typeof(obj) === "object" && obj[name_item]){
		return obj[name_item];
	}
	console.log("L'élément '"+name_item+"' dans l'objet '"+obj_name+"' n'existe pas.");
	return false;
}


// Fonction qui permet de vérifier si un nombre est bien entier et positif
function NombreEntierPositif(nbProduit){
    if(!isNaN(nbProduit) && nbProduit %1 === 0 && nbProduit>=0){
        return true;
    } else {
        return false;
    }

}


// Fonction qui permet d'initialiser l'ajout d'un produit
function ajouterProduit(nom_obj, val1, val2, mamethode) {
	console.log('Methode : '+mamethode)
	if (nom_obj === "stock" || nom_obj === "employes" || nom_obj === "clients" || nom_obj === "fournisseurs") {
	  var stock = getLS(nom_obj);
	  if (stock === null || typeof stock !== "object") {
		stock = {};
	  }
		if (searchItem(val1, nom_obj) && mamethode=="add") {
			$('.erreurs').html('<p style="color:red;text-align:center;">"'+val1+'" existe déjà. Veuillez sélectionner l\'option "modifier" pour le modifier.</p>');
		} else {
			stock[val1] = val2;
			if (saveLS(nom_obj, stock)) {
				if (mamethode=="mod") {
					$('.erreurs').html('<p style="color:green;text-align:center;">"'+val1+'" a correctement été modifié.</p>');
				} else {
				$('.erreurs').html('<p style="color:green;text-align:center;">"'+val1+'" a correctement été ajouté.</p>');
				}
			}
			
		}
	}
  }



// Fonction qui permet de valier un numéro de téléphone  
function validationTel(Tel) {
  var regex = new RegExp(/^(06|07)[0-9]{8}/gi);    
    if (regex.test(Tel)){
        return(true);
    } else {
        return(false);
    }
}


// Fonction qui met à jour le stock de tout les objets
function updateStock() {
	stock = getLS("stock");
	fournisseurs = getLS("fournisseurs");
	employes = getLS("employes");
	clients = getLS("clients");
	majValeurs();
}

// Affichage des valeurs sur la gauche de l'app
function majValeurs(){
	if(stock !== null){
		[stock].map((obj) => {  
			$('.nb_med').html(Object.keys(obj).length);
		});
		
	} if(fournisseurs !== null){
		[fournisseurs].map((obj) => {  
			$('.nb_fournisseur').html(Object.keys(obj).length);
		});
	} if(clients !== null){
		[clients].map((obj) => {  
			$('.nb_client').html(Object.keys(obj).length);
		});
	}
}


// Fonction qui récupère le stock et leurs valeurs pour les afficher dans une page
function recupererStock(obj_a_recuperer,div1,id1,id2) {
	updateStock();
	[obj_a_recuperer].map((obj) => {  
		$('.'+div1+'').html(Object.keys(obj).length);
		for (var i=0 ; i < (Object.keys(obj).length) ; i++) {
			$('.'+id1+'').append('<tr><td id="'+id1+i+'"></td><td id="'+id2+i+'"></td></tr>');
			$('#'+id1+i+'').html(Object.keys(obj)[i]);
			$('#'+id2+i+'').html(Object.values(obj)[i]);
		}
	});
}


//Fonction qui permet d'obtenir la date actuelle au format dd/mm/YYYY
function formattedDate(d = new Date) {
	return [d.getDate(), d.getMonth()+1, d.getFullYear()]
		.map(n => n < 10 ? `0${n}` : `${n}`).join('/');
  }

// Fonction qui gère l'affichage de l'ensemble des 4 listes.
function listStock(obj_a_recuperer, valeurstock, valeur, phraseperso) {
	updateStock();
	[obj_a_recuperer].map((obj) => {  
		for (var i=0 ; i < (Object.keys(obj).length) ; i++) {
			$('.debutliste').append('<div class="col-lg-4 col-md-6 col-sm-12 carte_'+Object.keys(obj)[i]+'"><div class="card all-patients"><div class="body"><div class="row"><div class="col-md-4 col-sm-4 text-center m-b-0"><a href="#" class="p-profile-pix"><img src="assets/images/logo.png" class="img-thumbnail img-fluid"></a></div><div class="col-md-8 col-sm-8 m-b-0"><h5 class="m-b-0">'+Object.keys(obj)[i]+'<a href="#" data-nom="'+valeur+'" data-method="mod" class="edit" id="'+Object.keys(obj)[i]+'"><i class="zmdi zmdi-edit"></i></a><a href="#" class="delete" id="'+Object.keys(obj)[i]+'"><i class="zmdi zmdi-delete"></i></a></h5> <small>Ajouté le '+formattedDate()+'</small><address class="m-b-0">'+phraseperso+' '+Object.values(obj)[i]+'<br></address></div></div></div></div></div>');
		}
	});
	$('.debutliste').append('<div class="stock" style="display:none;" id="'+valeurstock+'"></div>')


}


// Début du document
$(document).ready(function(){

	majValeurs(); // Mise à jour du nombre d'items dans la sidebar

	// Suppression d'un item selon l'élement cliqué
	$('.liste').on('click', '.delete', function() {
		console.log("Entrée dans la fonction")
		var monid = $(this).attr("id");
		var valeurstock = $('.stock').attr("id");
		console.log('ID cliqué :' +monid);
		console.log('Stock cliqué :' +valeurstock);
		if(window.confirm('Voulez-vous vraiment supprimer "'+monid+'" ? Cette opération est définitive.')) {
			deleteItem(monid,valeurstock,valeurstock);
			$(".carte_"+monid+"").fadeOut(function(){
				$(".carte_"+monid+"").remove();
				updateStock();
			});
		}
	});


	// Ajout d'un élement au submit
	$("#ajouter").submit(function(e){
		e.preventDefault();
		console.log("Méthode :"+currentpage)
		console.log(id2)
		console.log(id1)
		if (currentpage==="add") {
			var champ1 = $("#"+id1+"").val();
			var champ2 = $("#"+id2+"").val();
			if (id1==="medicament_nom") {
				if(isNaN(champ1) && champ1 !== ""){
					if(!isNaN(champ2) && champ2 > 0 && champ2%1 === 0 && champ2!==""){
						ajouterProduit("stock", champ1,champ2,mamethode);
						$('.champ1, .champ2').val("");
						updateStock();
					}
				}
			} else if (id1==="client_nom") {
				if(isNaN(champ1) && champ1 !== ""){
					if(validationTel(champ2) && champ2!==""){
						ajouterProduit("clients", champ1,champ2,mamethode);
						$('.champ1, .champ2').val("");
						updateStock();
					}
				}
			} else if (id1==="employe_nom") {
				if(isNaN(champ1) && champ1 !== ""){
					if(isNaN(champ2) && champ2!==""){
						ajouterProduit("employes", champ1,champ2,mamethode);
						$('.champ1, .champ2').val("");
						updateStock();
					}
				}
			} else if (id1==="fournisseur_nom") {
				if(isNaN(champ1) && champ1 !== ""){
					if(isNaN(champ2) && champ2!==""){
						ajouterProduit("fournisseurs", champ1,champ2,mamethode);
						$('.champ1, .champ2').val("");
						updateStock();
					}
				}
			}
		}
	});	 



	// Script pour cacher et afficher les différentes pages, avec leurs informations respectives
	$('body').on('click', 'li, a', function() {
		var page = $(this).data("nom");
		var method = $(this).data("method");
		if (page !== undefined) {
			id1 = "";
			id2 = "";
			updateStock();
			console.log(page);
			$("li").removeClass("active");
			$("a").removeClass("active");
			$(this).addClass("active");
			$(this).children("a").addClass("active");
			$('.erreurs').html('');
			$(".champ1").html('');
			$(".champ2").html('');
			if (method === "add" || method === "mod") {
					$("."+currentpage+"").slideUp(800,function(){
					$(".add").slideDown(800);
					if (method==="add") {
						currentpage = "add";
						mamethode = "add";
						console.log(currentpage);
						console.log(page)
						$(".add h2").html("Ajouter un "+page);
						$(".add .txt1").html("Ajouter un "+page+" à la liste");
						$(".add .header h2").html("Enregistrement d'un "+page);
					} else if (method==="mod") {
						currentpage = "add";
						mamethode = "mod";
						console.log(currentpage);
						$(".add h2").html("Modifier un "+page);
						if (page==="médicament" || page==="client" || page==="fournisseur") {
							$(".add .txt2").html("Merci de faire les changements voulus pour modifier le "+page+"");
							$(".add .txt1").html("Modifications des données d'un "+page+"");
						} else if (page==="employé") {
							$(".add .txt2").html("Merci de faire les changements voulus pour modifier l'"+page+"");
							$(".add .txt1").html("Modifications des données d'un "+page+"");
						}
					}
				
					if (page==="médicament") {
						id1 = "medicament_nom";
						id2 = "medicament_qte";
						$(".add .txt2").html("Merci de rentrer le nom d'un "+page+" et sa quantité disponible.");
						$(".add .champ1").html('<input type="text" class="form-control" id="medicament_nom" placeholder="Nom du médicament">');
						$(".add .champ2").html('<input type="text" class="form-control" id="medicament_qte" placeholder="Quantité en stock">');
					} else if (page==="client") {
						id1 = "client_nom";
						id2 = "client_numero";
						$(".add .txt2").html("Merci de rentrer le nom du "+page+" et son numéro de téléphone.");
						$(".add .champ1").html('<input type="text" class="form-control" id="client_nom" placeholder="Nom du client">');
						$(".add .champ2").html('<input type="text" class="form-control" id="client_numero" placeholder="Numéro de téléphone">');
					} else if (page==="fournisseur") {
						id1 = "fournisseur_nom";
						id2 = "fournisseur_adresse";
						$(".add .txt2").html("Merci de rentrer le nom du "+page+" et son adresse.");
						$(".add .champ1").html('<input type="text" class="form-control" id="fournisseur_nom" placeholder="Nom du fournisseur">');
						$(".add .champ2").html('<textarea class="form-control" id="fournisseur_adresse" placeholder="Adresse du fournisseur"></textarea>');
					} else if (page==="employé") {
						id1 = "employe_nom";
						id2 = "employe_poste";
						$(".add .txt2").html("Merci de rentrer le nom de l'"+page+" et son poste actuel.");
						$(".add .champ1").html('<input type="text" class="form-control" id="employe_nom" placeholder="Nom de l\'employé">');
						$(".add .champ2").html('<input type="text" class="form-control" id="employe_poste" placeholder="Poste de l\'employé">');
					}


					//// Vérifications des champs
					if (id1==="medicament_nom" || id1==="client_nom" || id1==="employe_nom" || id1==="fournisseur_nom") {
							$(".champ1").keypress(function(){
								$('.erreurs').html('');
								$('.champ1').css({'border-bottom':'1px solid #ddd'});
								$('.champ1').children("#"+id1+"").css({'color':'#464a4c'});
							});
							$(".champ1").focusout(function(){
								var nom = $("#"+id1+"").val();
								if(!isNaN(nom) || nom === ""){
									$('.champ1').css({'border-bottom':'1px solid red'});
									$('.champ1').children("#"+id1+"").css({'color':'red'});
									$('.erreurs').html('<p style="color:red;text-align:center;">ERREUR : Veuillez saisir un nom composé de caractères uniquement.</p>');
								}
							});
						}
						
						if (id1==="client_nom") {
							$(".champ2").keypress(function(){
								$('.erreurs').html('');
								$('.champ2').css({'border-bottom':'1px solid #ddd'});
								$('.champ2').children("#"+id2+"").css({'color':'#464a4c'});
							});
							$(".champ2").focusout(function(){
								var tel = $("#"+id2+"").val();
								if(!validationTel(tel) || tel === ""){
									$('.champ2').css({'border-bottom':'1px solid red'});
									$('.champ2').children("#"+id2+"").css({'color':'red'});
									$('.erreurs').html('<p style="color:red;text-align:center;">ERREUR : Veuillez saisir un numéro de téléphone composé de chiffres uniquement, et qui commence par 06 ou 07</p>');
								}
							});
						} else if (id1==="employe_nom") {
							$(".champ2").keypress(function(){
								$('.erreurs').html('');
								$('.champ2').css({'border-bottom':'1px solid #ddd'});
								$('.champ2').children("#"+id2+"").css({'color':'#464a4c'});
							});
							$(".champ2").focusout(function(){
								var poste = $("#"+id2+"").val();
								if(!isNaN(poste) || poste === ""){
									$('.champ2').css({'border-bottom':'1px solid red'});
									$('.champ2').children("#"+id1+"").css({'color':'red'});
									$('.erreurs').html('<p style="color:red;text-align:center;">ERREUR : Veuillez saisir un nom de poste composé de lettres uniquement</p>');
								}
							});
						} else if (id1==="fournisseur_nom") {
							$(".champ2").keypress(function(){
								$('.erreurs').html('');
								$('.champ2').css({'border-bottom':'1px solid #ddd'});
								$('.champ2').children("#"+id2+"").css({'color':'#464a4c'});
							});
							$(".champ2").focusout(function(){
								var adresse = $("#"+id2+"").val();
								if(adresse === ""){
									$('.champ2').css({'border-bottom':'1px solid red'});
									$('.champ2').children("#"+id1+"").css({'color':'red'});
									$('.erreurs').html('<p style="color:red;text-align:center;">ERREUR : Veuillez saisir une adresse</p>');
								}
							});
						} else if (id1==="medicament_nom") {
							$(".champ2").keypress(function(){
								$('.erreurs').html('');
								$('.champ2').css({'border-bottom':'1px solid #ddd'});
								$('.champ2').children("#"+id2+"").css({'color':'#464a4c'});
							});
							$(".champ2").focusout(function(){
								var qte = $("#"+id2+"").val();
								if(isNaN(qte) || qte < 0 || qte%1!==0 || qte==""){
									$('.champ2').css({'border-bottom':'1px solid red'});
									$('.champ2').children("#"+id1+"").css({'color':'red'});
									$('.erreurs').html('<p style="color:red;text-align:center;">ERREUR : Veuillez saisir un stock positif entier.</p>');
								}
							});
						}
						
					});
			} else if (method === "liste") {
					$("."+currentpage+"").slideUp(800,function(){
					$(".liste").slideDown(800);
					currentpage = "liste";
					$(".liste h2").html("Liste des "+page+"s");
					$(".liste .txt1").html("Liste de l'ensemble des "+page+"s");
					console.log(currentpage); 
					medocsok = window.localStorage.getItem("stock");
					employeok = window.localStorage.getItem("employes");
					fournisseurok = window.localStorage.getItem("fournisseurs");
					clientok = window.localStorage.getItem("clients");
					$('.debutliste').html('');
					if(medocsok !== null && page ==="médicament"){
						listStock(stock, "stock", page, "Quantité en stock :");
					} if(fournisseurok !== null && page ==="fournisseur"){
						listStock(fournisseurs, "fournisseurs", page, "Adresse :");
					} if(employeok !== null && page ==="employé"){
						listStock(employes, "employes", page, "Poste de l'employé :");
					} if(clientok !== null && page ==="client"){
						listStock(clients, "clients", page, "Numéro de tél. :");
					} if ($('.debutliste').html()=="") {
							$('.debutliste').html('<div style="text-align:center;padding-bottom:50px;" class="col-md-12">Aucune donnée enregistrée pour le moment.</div>');
							console.log("Aucune valeur présente dans l'objet demandé > Texte \"Aucune donnée\"")
					}	
				});
			} else {
					$("."+currentpage+"").slideUp(800,function(){
					$("."+page+"").slideDown(800);
					currentpage = page;
					console.log(currentpage); 
					medocsok = window.localStorage.getItem("stock");
					employeok = window.localStorage.getItem("employes");
					fournisseurok = window.localStorage.getItem("fournisseurs");
					clientok = window.localStorage.getItem("clients");
					$('.nom_med, .nom_fournisseur, .nom_employe, .nom_client').html('');
					if(medocsok !== null){
						recupererStock(stock,"nb_med","nom_med","qte_med");
					} if(fournisseurok !== null){
						recupererStock(fournisseurs,"nb_fournisseur","nom_fournisseur","tel_fournisseur");
					} if(employeok !== null){
						recupererStock(employes,"nb_employe","nom_employe","poste_employe");
					} if(clientok !== null){
						recupererStock(clients,"nb_clients","nom_client","tel_client");
					} 
				});
				
			}
		}
	});
});