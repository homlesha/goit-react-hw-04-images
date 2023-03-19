import React from 'react';
import { toast } from 'react-toastify';
import { SearchSVG } from 'assets/SearchSVG';
import { useState } from 'react';

import {
  Header,
  SearchForm,
  SearchButton,
  SearchInput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleNameChange = event => {
    setName(event.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (name.trim() === '') {
      toast.error('Введите название изображения!');
      return;
    }
    setName(onSubmit(name));

    setName('');
  };

  return (
    <Header onSubmit={handleSubmit}>
      <SearchForm>
        <SearchButton type="submit">
          <SearchSVG></SearchSVG>
        </SearchButton>

        <SearchInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={name}
          onChange={handleNameChange}
        />
      </SearchForm>
    </Header>
  );
};

export default Searchbar;

// import React from 'react';
// import { Component } from 'react';
// import { toast } from 'react-toastify';
// import { SearchSVG } from 'assets/SearchSVG';

// import {
//   Header,
//   SearchForm,
//   SearchButton,
//   SearchInput,
// } from './Searchbar.styled';

// export class Searchbar extends Component {
//   state = {
//     name: '',
//   };

//   handleNameChange = event => {
//     this.setState({ name: event.currentTarget.value});
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     if (this.state.name.trim() === '') {
//       toast.error("Введите название изображения!")
//       return;
//     }
//     this.props.onSubmit(this.state.name);
//     // this.reset();
//   };
//   reset = () => {
//     this.setState({ name: '' });
//   };
//   render() {
//     return (
//       <Header onSubmit={this.handleSubmit}>
//         <SearchForm>
//           <SearchButton type="submit">
//             <SearchSVG></SearchSVG>
//           </SearchButton>

//           <SearchInput
//             type="text"
//             autocomplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.name}
//             onChange={this.handleNameChange}
//           />
//         </SearchForm>
//       </Header>
//     );
//   }
// }

// export default Searchbar;
