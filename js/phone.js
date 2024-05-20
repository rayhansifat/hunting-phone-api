const loadPhone = async (searchText, isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) =>{
    // console.log(phones)
    
    //Step-1. 
    const phoneContainer = document.getElementById('phone-container')

    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';
    
  // Display show all button  if there are more than 12 phones
  const showAllContainer = document.getElementById('show-all-container')
  if(phones.length > 12 && !isShowAll){
    showAllContainer.classList.remove('hidden')
  }
  else{
    showAllContainer.classList.add('hidden')
  }

  // console.log('is show all', isShowAll)

  //  display only first 12 phones //if not show all
  // phones = phones.slice(0,12)
  if(!isShowAll){
    phones = phones.slice(0,12);
  }


    phones.forEach(phone =>{
        // console.log(phone)
        //Step-2. Create a div
        const PhoneCard = document.createElement('div');
        PhoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
        //Step-3. set innerHtml
        PhoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
        `;

        // Step-4. append child
        phoneContainer.appendChild(PhoneCard);
    });

    // Hide loading spinner
    toggleLoadingSpinner(false);
}

//
const handleShowDetail = async (id) =>{
  // console.log('click show details',id)
  //load single phone data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  // console.log(data);
  const phone = data.data;

  // showPhoneDetails(data)
  showPhoneDetails(phone)
}

//
const showPhoneDetails = (phone) =>{
  console.log(phone);
  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById('show-detail-container');

  showDetailContainer.innerHTML = `

    <img src="${phone.image}" />
    <p><span>Storage:</span>${phone.mainFeatures.storage}</p>
    <p><span>Display Size:</span>${phone?.mainFeatures?.displaySize}</p>
    <p><span>Chipset:</span>${phone?.mainFeatures?.chipSet}</p>
    <p><span>Memory:</span>${phone?.mainFeatures?.memory}</p>
    <p><span>Slug:</span>${phone?.slug}</p>
    <p><span>Release Date:</span>${phone?.releaseDate}</p>
    <p><span>Brand:</span>${phone?.brand}</p>
    <p><span>GPS:</span>${phone?.others?.GPS || 'No GPS available'}</p>
  
  `


  // show the modal
  show_details_modal.showModal();
}

// Handle Search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    // console.log('Search handle')
    const SearchField = document.getElementById('search-field');
    const searchText = SearchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

//Loading spinner
const toggleLoadingSpinner = (isLoading) =>{
  const loadingSpinner = document.getElementById('loading-spin')
  // loadingSpinner.classList.remove('hidden')
  if(isLoading){
    loadingSpinner.classList.remove('hidden')
  }
  else{
    loadingSpinner.classList.add('hidden');
  }  
}

// Handle show all 
const handleShowAll = () =>{
  handleSearch(true);
}

// loadPhone();
